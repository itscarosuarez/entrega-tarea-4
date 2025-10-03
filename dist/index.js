"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// GET /products - Lista todos los productos
app.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});
// POST /products - Crea un nuevo producto
app.post('/products', async (req, res) => {
    try {
        const { titulo, precio, imagen, descripcion } = req.body;
        // Validación básica
        if (!titulo || !precio || !imagen || !descripcion) {
            return res.status(400).json({
                error: 'Todos los campos son requeridos: titulo, precio, imagen, descripcion'
            });
        }
        const product = await prisma.product.create({
            data: {
                titulo,
                precio,
                imagen,
                descripcion
            }
        });
        res.status(201).json(product);
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Error creating product' });
    }
});
// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API de Galería funcionando!' });
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Cerrando servidor...');
    await prisma.$disconnect();
    process.exit(0);
});
