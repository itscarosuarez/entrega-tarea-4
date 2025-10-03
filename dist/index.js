"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = Number(process.env.PORT) || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/arte', async (req, res) => {
    const obras = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    res.json(obras);
});
app.post('/arte', async (req, res) => {
    const { titulo, precio, imagen, descripcion } = req.body;
    const obra = await prisma.product.create({
        data: {
            titulo,
            precio,
            imagen,
            descripcion
        }
    });
    res.status(201).json(obra);
});
app.get('/', (req, res) => {
    res.json({ message: 'API de Galería de Arte funcionando!' });
});
app.listen(PORT, '0.0.0.0');
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
