import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const app=express();
const prisma=new PrismaClient();
const PORT=Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get('/arte', async (req, res)=>{
  const obras=await prisma.product.findMany({
    orderBy:{
      createdAt:'desc'
    }
  });
  res.json(obras);
});

app.post('/arte', async (req, res)=>{
  const { titulo, precio, imagen, descripcion }=req.body;
  const obra=await prisma.product.create({
    data:{
      titulo,
      precio,
      imagen,
      descripcion
    }
  });
  res.status(201).json(obra);
});

app.get('/', (req, res)=>{
  res.json({ message:'API de Galería de Arte funcionando!' });
});

app.listen(PORT, '0.0.0.0');

process.on('SIGINT', async ()=>{
  await prisma.$disconnect();
  process.exit(0);
});
