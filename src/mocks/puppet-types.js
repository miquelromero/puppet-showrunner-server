// Still pending to decide how to get it. Maybe by just reading the puppet code (or an associated xml).
const puppetTypes = [
  {
    name: "example",
    title: "This is a puppet example",
    description: "This puppet opens a website and stays there",
    params: [
      {
        name: "url",
        label: "Url",
        mandatory: true,
        type: "String"
      }
    ]
  }
];

exports.puppetTypes = puppetTypes;