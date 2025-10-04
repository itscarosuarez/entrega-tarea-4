import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  const products = [
    {
      titulo: 'La Mona Lisa',
      precio: '$2.000.000.000',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
      descripcion: 'Leonardo da Vinci. Óleo sobre tabla de álamo. Museo del Louvre, París. Una de las pinturas más famosas del mundo.',
    },
    {
      titulo: 'El Nacimiento de Venus',
      precio: '$800.000.000',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/2880px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
      descripcion: 'Sandro Botticelli. Temple sobre lienzo. Galería Uffizi, Florencia. Representa a la diosa Venus emergiendo del mar.',
    },
    {
      titulo: 'La Creación de Adán',
      precio: '$5.000.000.000',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Creaci%C3%B3n_de_Ad%C3%A1n.jpg',
      descripcion: 'Miguel Ángel. Fresco en la Capilla Sixtina. Vaticano. Famoso por el dedo de Dios tocando a Adán.',
    },
    {
      titulo: 'La Escuela de Atenas',
      precio: '$1.500.000.000',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1200px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
      descripcion: 'Rafael Sanzio. Fresco en los Museos Vaticanos. Representa a los filósofos griegos más importantes.',
    },
    {
      titulo: 'La Última Cena',
      precio: '$2.000.000.000',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1200px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg',
      descripcion: 'Leonardo da Vinci. Pintura mural al temple y óleo. Convento de Santa María delle Grazie, Milán.',
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
