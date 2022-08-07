import { InputData, jsonInputForTargetLanguage, quicktype } from "quicktype-core";

interface quicktypeJsonProps {
  lang: string;
  json: string;
  rootName: string;
}

export const quicktypeJson = async ({ json, rootName, lang }: quicktypeJsonProps) => {
  const jsonInput = jsonInputForTargetLanguage(lang);
  await jsonInput.addSource({
    name: rootName,
    samples: [json],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const { lines } = await quicktype({
    inputData,
    alphabetizeProperties: true,
    lang,
    rendererOptions: {
      framework: "just-types",
      "just-types": "true",
      acronymStyle: "original",
    },
  });

  return lines.join("\n");
};
