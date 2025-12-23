export interface OcorrenciaCartazDTO {
  urlCartaz: string;
  tipoCartaz:
    | "PDF_DESAPARECIDO"
    | "PDF_LOCALIZADO"
    | "JPG_DESAPARECIDO"
    | "JPG_LOCALIZADO"
    | "INSTA_DESAPARECIDO"
    | "INSTA_LOCALIZADO";
}

export interface OcorrenciaEntrevDesapDTO {
  informacao: string;
  vestimentasDesaparecido: string;
}

export interface OcorrenciaDTO {
  dtDesaparecimento: string;
  dataLocalizacao: string;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocoId: number;
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
  listaCartaz: OcorrenciaCartazDTO[];
}

export interface PersonDTO {
  id: number;
  nome: string;
  idade: number;
  sexo: "MASCULINO" | "FEMININO";
  vivo: boolean;
  urlFoto?: string;
  ultimaOcorrencia?: OcorrenciaDTO;
}

export interface FormFilter {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: string;
  status?: string;
  pagina?: number;
  porPagina?: number;
}

export interface OcorrenciaInfoDTO {
  ocoId: number;
  informacao: string;
  data: string;
  id: number;
  anexos?: string[];
}

export interface EstatisticalDataDTO {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
}
