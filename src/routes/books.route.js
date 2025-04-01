async function booksRoute(fastify, options) {

  fastify.get('/', async (request, reply) => {
    const books = await fastify.prisma.book.findMany();
    return books;
  });

  const getBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };

  fastify.get('/:id', { schema: getBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
   const { id } = request.params;
   const book = await fastify.prisma.book.findUnique(id);
   return book;
    // tips : look about findUnique
  });

  const createBookSchema = {
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.post('/', { schema: createBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    const { title, author } = request.body;
    const new_book = {title:title , author:author}
    fastify.prisma.book.upsert(new_book);
    reply.code(201).send(new_book);
  });

  const updateBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.put('/:id', { schema: updateBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    const {id} = request.params;
    const {title, author} = request.body;
    const updated_book = {title:title, author:author}
    fastify.prisma.book.update(id) = updated_book;
    reply.code(201).send(updated_book);
  });

  const deleteBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };
  fastify.delete('/:id', { schema: deleteBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    reply.code(404).send({ error: 'Not implemented' });
  });
}

export default booksRoute;