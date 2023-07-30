import { Request, Response } from "express";
import { prisma } from "../prisma/prismaclient";
import { AppError } from "../errors/AppError";
import {
  findAllClients,
  findClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/client.controller";

describe("Client Tests", () => {
  const req = {} as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("findAllClients", () => {
    it("should return all clients", async () => {
      const fakeClient = [
        {
          id: "1",
          name: "Fake Client",
          dob: new Date("1990-01-01"),
          sex: "Male",
          healthProblem: [
            { id: "1", name: "Fake Problem 1", degree: 1 },
            { id: "2", name: "Fake Problem 2", degree: 2 },
          ],
        },
      ];

      prisma.client.findMany = jest.fn().mockReturnValue(fakeClient);

      await findAllClients(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeClient);
    });
  });

  describe("findClientById", () => {
    it("should returnm the client by id", async () => {
      const fakeClientId = "1";

      const fakeClient = {
        id: fakeClientId,
        name: "Fake Client",
        dob: new Date("1990-01-01"),
        sex: "Female",
        healthProblem: [
          { id: "1", name: "Fake Problem 1", degree: 1 },
          { id: "2", name: "Fake Problem 2", degree: 2 },
        ],
      };

      prisma.client.findUnique = jest.fn().mockResolvedValue(fakeClient);

      req.params = { id: fakeClientId };

      await findClientById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeClient);
    });
  });

  describe("createClient", () => {
    it("should create a new client", async () => {
      const fakeClientData = {
        name: "Fake Client",
        dob: new Date("1990-01-01"),
        sex: "Male",
        healthProblem: [
          { name: "Fake Problem 1", degree: 1 },
          { name: "Fake Problem 2", degree: 2 },
        ],
      };

      const createdFakeClient = {
        id: "1",
        name: "Fake Client",
        dob: new Date("1990-01-01"),
        sex: "Male",
        healthProblem: [
          {
            id: "1",
            name: "Fake Problem 1",
            degree: 1,
          },
        ],
      };

      prisma.client.create = jest.fn().mockResolvedValue(createdFakeClient);

      req.body = fakeClientData;

      await createClient(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdFakeClient);
    });
  });

  describe("updateClient", () => {
    it("should update an existing client", async () => {
      const fakeClientId = "1";

      const fakeClient = {
        id: fakeClientId,
        name: "Fake Client",
        dob: new Date("1990-01-01"),
        sex: "Male",
        healthProblem: [
          {
            id: "1",
            name: " Fake Problem 1",
            degree: 1,
          },
          {
            id: "2",
            name: "Fake Problem 2",
            degree: 2,
          },
        ],
      };

      prisma.client.findUnique = jest.fn().mockResolvedValue(fakeClient);
      prisma.client.update = jest.fn().mockResolvedValue(fakeClient);

      req.params = { id: fakeClientId };
      req.body = {
        name: "Updated Fake Client",
        dob: "1990-01-01",
        sex: "Female",
        healthProblem: [
          {
            id: "1",
            name: "Updated Fake Problem 1",
            degree: 1,
          },
          {
            id: "2",
            name: "Updated Fake Problem 2",
            degree: 2,
          },
        ],
      };

      await updateClient(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeClient);
    });
  });

  describe("deleteClient", () => {
    it("should delete an existing client", async () => {
      const fakeClientId = "1";

      prisma.client.findUnique = jest
        .fn()
        .mockResolvedValue({ id: fakeClientId });
      prisma.client.delete = jest.fn().mockResolvedValue({ id: fakeClientId });

      req.params = { id: fakeClientId };

      await deleteClient(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
