async function loginRoute(fastify,options){

const createUser = {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: { type: 'string' },  
        password: { type: 'string' },
      },
    },
  };

  fastify.post('/register', { schema: createUser }, async (request, reply) => {
    const { username, password} = request.body;
    if (!username || !password) {
      reply.code(400).send({ error: 'username and password are required' });
      return;
    }
    const user = await fastify.prisma.user.create({
      data: { username, password },
    });
    reply.code(201).send(user);
  });

  fastify.post('/login', { schema: createUser }, async (request, reply) => {
    const { username, password} = request.body;
    if (!username || !password) {
      reply.code(400).send({ error: 'username and password are required' });
      return;
    }
    user = fastify.prisma.user.find( fastify.prisma.user.array.foreach( (user_)=> {return (user_.username = username) && (user_.password = password)}));
    if(!user) {
        reply.code(404)/send({error: 'user not found'})
        return;
    }
    reply.code(201).send(user);
  });

}
export default loginRoute;