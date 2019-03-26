const Hapi = require('hapi');
const Path = require('path');
const mocker = require('mocker-data-generator').default;

const random = outOf => {
  return Math.floor(Math.random() * outOf + 1);
};

// const vote = {
//   username: { faker: "internet.userName" },
//   repository: { faker: "internet.url" },
// };

// votes = await mocker()
//   .schema("votes", vote, 50)
//   .build();

// makeVotes = () => ({
//   function() {
//     return this.faker.random.arrayElement(votes.votes);
//   },
//   length: random(),
// });

const package = {
  id: { incrementalId: 0 },
  name: { faker: 'commerce.productName' },
  description: { faker: 'lorem.paragraph' },
  readme: { faker: 'lorem.paragraphs(4)' },
  image: {
    function() {
      return this.faker.image.image().replace('http://', 'https://') + '/';
    },
  },
  website: { faker: 'internet.url' },
  repository: { faker: 'internet.url' },
  license: { faker: 'commerce.productAdjective' },
  commentsCount: { faker: 'random.number({"min": 20, "max": 100})' },
  comments: [
    {
      function() {
        return {
          avatar: this.faker.internet.avatar(),
          text: this.faker.lorem.paragraph(),
          username: this.faker.internet.userName(),
          added: this.faker.date.past(),
        };
      },
      length: random(100),
    },
  ],
  upvotes: { faker: 'random.number({"min": 100, "max": 1000})' },
  downvotes: { faker: 'random.number({"min": 50, "max": 100})' },
  tags: [
    {
      function() {
        return this.faker.company.catchPhraseNoun();
      },
      length: random(10),
    },
  ],
  added: { faker: 'date.past' },
};

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: true,
      files: { relativeTo: Path.join(__dirname, 'dist/flink-ecosystem') },
    },
    router: { stripTrailingSlash: true },
  });

  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/api/v1/packages/{category?}',
    handler: () =>
      mocker()
        .schema('packages', package, 15)
        .build()
        .then(data => ({ items: data.packages })),
  });

  server.route({
    method: 'GET',
    path: '/api/v1/search',
    handler: () =>
      mocker()
        .schema('packages', package, 5)
        .build()
        .then(data => ({ items: data.packages })),
  });

  server.route({
    method: 'GET',
    path: '/api/v1/package/{name}',
    handler: () =>
      mocker()
        .schema('package', package, 1)
        .build()
        .then(data => data.package[0]),
  });

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: '.',
        listing: false,
        index: ['index.html'],
      },
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
