import { AmplifyAuthCognitoStackTemplate } from "@aws-amplify/cli-extensibility-helper";

export function override(resources: AmplifyAuthCognitoStackTemplate) {
  const customAttibutes = [
    {
      attributeDataType: "String",
      developerOnlyAttribute: false,
      mutable: true,
      name: "descricaoEmpresa",
      required: false,
      maxLength: "25"
    },
    {
      attributeDataType: "String",
      developerOnlyAttribute: false,
      mutable: true,
      name: "municipio",
      required: false,
    },
    {
      attributeDataType: "String",
      developerOnlyAttribute: false,
      mutable: true,
      name: "razaoSocial",
      required: false,
    },
    {
      attributeDataType: "String",
      developerOnlyAttribute: false,
      mutable: true,
      name: "cnpj",
      required: false,
    },
    {
      attributeDataType: "String",
      developerOnlyAttribute: false,
      mutable: true,
      name: "bairro",
      required: false,
    },
    {
      attributeDataType: "String",
      developerOnlyAttribute: false,
      mutable: true,
      name: "uf",
      required: false,
    },
    {
      attributeDataType: "String",
      developerOnlyAttribute: false,
      mutable: true,
      name: "cep",
      required: false,
    },
    {
      attributeDataType: "String",
      developerOnlyAttribute: false,
      mutable: true,
      name: "nomeFantasia",
      required: false,
    },
    {
      attributeDataType: "String",
      developerOnlyAttribute: false,
      mutable: true,
      name: "endereco",
      required: false,
    },
  ];
  resources.userPool.schema = [
    ...(resources.userPool.schema as any[]), // Carry over existing attributes (example: email)
    ...customAttibutes,
  ];
}
