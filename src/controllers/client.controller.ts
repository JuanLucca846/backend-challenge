import { Request, Response } from "express";
import { Client } from "../models/Client";
import { prisma } from "../prisma/prismaclient";
import { AppError } from "../errors/AppError";

export const findAllClients = async (req: Request, res: Response) => {
  const allCLients = await prisma.client.findMany({
    include: {
      healthProblem: true,
    },
  });
  return res.status(200).json(allCLients);
};

export const findClientById = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  const findClient = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
    include: {
      healthProblem: true,
    },
  });

  if (findClient) {
    return res.status(200).json(findClient);
  } else {
    throw new AppError("This Client Does Not Exist!");
  }
};

export const createClient = async (req: Request, res: Response) => {
  const { name, dob, sex, healthProblem } = req.body;

  const client: Client = await prisma.client.create({
    data: {
      name,
      dob,
      sex,
      healthProblem: {
        create: healthProblem,
      },
    },
    include: {
      healthProblem: true,
    },
  });
  return res.status(201).json(client);
};

export const updateClient = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  const { name, dob, sex, healthProblem } = req.body;

  const checkIfClientExist = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });

  if (checkIfClientExist) {
    const updateClient = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        name,
        dob,
        sex,
        healthProblem: {
          deleteMany: {},
          create: healthProblem,
        },
      },
      include: {
        healthProblem: true,
      },
    });
    return res.status(200).json(updateClient);
  } else {
    throw new AppError("This Client Does Not Exist!");
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const clientId = req.params.id;

  const checkIfClientExist = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });

  if (checkIfClientExist) {
    const deleteClient = await prisma.client.delete({
      where: {
        id: clientId,
      },
    });
    return res.sendStatus(204);
  } else {
    throw new AppError("This Client Does Not Exist!");
  }
};

export const clientRisk = async (req: Request, res: Response) => {
  const findClients = await prisma.client.findMany({
    include: {
      healthProblem: true,
    },
  });

  const clientsWithRisk = findClients.map((client) => {
    const sd = client.healthProblem.reduce(
      (total, problem) => total + problem.degree,
      0
    );
    const score = (1 / (1 + Math.exp(-(-2.8 + sd)))) * 100;

    return { client, score };
  });

  const sortClientByRisk = clientsWithRisk
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return res.status(200).json(sortClientByRisk);
};
