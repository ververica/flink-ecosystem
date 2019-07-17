import {
  faPlug,
  faTachometerAlt,
  faProjectDiagram,
  faTools,
  faCode,
  faQuestion,
  faDatabase,
  faServer,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export const categories: category[] = [
  {
    name: "Connectors",
    value: "connectors",
    icon: faPlug,
    iconTitle: "plug",
  },

  {
    name: "Examples",
    value: "examples",
    icon: faQuestion,
    iconTitle: "question",
  },
  {
    name: "Metrics",
    value: "metrics",
    icon: faTachometerAlt,
    iconTitle: "tachometer",
  },
  {
    name: "Tools",
    value: "tools",
    icon: faTools,
    iconTitle: "tools",
  },
  {
    name: "Deployments",
    value: "deployments",
    icon: faServer,
    iconTitle: "server",
  },
  {
    name: "APIs",
    value: "apis",
    icon: faCode,
    iconTitle: "code",
  },
  {
    name: "SQL",
    value: "sql",
    icon: faDatabase,
    iconTitle: "database",
  },
  {
    name: "Machine Learning",
    value: "machine-learning",
    icon: faProjectDiagram,
    iconTitle: "diagram",
  },
];

type category = {
  name: string;
  value: string;
  icon: IconDefinition;
  iconTitle: string;
};
