const puppetTypes = [
  {
    name: 'example',
    title: 'This is a puppet example',
    description: 'This puppet searches your query on Google',
    params: [
      {
        name: 'query',
        label: 'Text to search',
        mandatory: true,
        type: 'String',
      },
    ],
  },
];

exports.puppetTypes = puppetTypes;
