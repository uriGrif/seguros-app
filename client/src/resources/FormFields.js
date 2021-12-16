import Companias from "./selectOptions/Companias.json";
import MediosDePago from "./selectOptions/MediosDePago.json";
import MotivosBaja from "./selectOptions/MotivosBaja.json";
import Productores from "./selectOptions/Productores.json";
import Riesgos from "./selectOptions/Riesgos.json";
import Secciones from "./selectOptions/Secciones.json";
import TiposPersona from "./selectOptions/TiposPersona.json";
import Vigencias from "./selectOptions/Vigencias.json";

export const AseguradoFormFields = [
	{
		label: "Asegurado",
		name: "Asegurado",
		type: "text"
	},
	{
		label: "Nombre Contacto",
		name: "NombreContacto",
		type: "text"
	},
	{
		label: "Email 1",
		name: "Email1",
		type: "email"
	},
	{
		label: "Email 2",
		name: "Email2",
		type: "email"
	},
	{
		label: "Celular",
		name: "Celular",
		type: "tel"
	},
	{
		label: "Tel. Particular",
		name: "TelefonoParticular",
		type: "tel"
	},
	{
		label: "Tel. Laboral",
		name: "TelefonoLaboral",
		type: "tel"
	},
	{
		label: "Observaciones",
		name: "Observaciones",
		type: "text"
	},
	{
		label: "Domicilio",
		name: "Domicilio",
		type: "text"
	},
	{
		label: "Localidad",
		name: "Localidad",
		type: "text"
	},
	{
		label: "Cuit",
		name: "Cuit",
		type: "text"
	},
	{
		label: "Documento",
		name: "Documento",
		type: "text"
	},
	{
		label: "Codigo Postal",
		name: "CodPostal",
		type: "text"
	},
	{
		label: "Fecha de Nacimiento",
		name: "FechaNacimiento",
		type: "date"
	},
	{
		label: "Valor Asegurado",
		name: "ValorAsegurado",
		type: "number"
	},
	{
		label: "Sexo",
		name: "Sexo",
		type: "text"
	},
	{
		label: "Patrimoniales",
		name: "Patrimoniales",
		type: "checkbox"
	},
	{
		label: "ART",
		name: "ART",
		type: "checkbox"
	},
	{
		label: "Tipo Persona",
		name: "tipoPersona",
		type: "select"
	}
];

export const PolizaFormFields = [
	{
		label: "Numero de Poliza",
		name: "NroPoliza",
		type: "number"
	},
	// {
	// 	label: "idAsegurado",
	// 	name: "idAsegurado",
	// 	type: "text"
	// },
	// {
	// 	label: "Asegurado",
	// 	name: "NombreAsegurado",
	// 	type: "text"
	// },
	{
		label: "Observaciones",
		name: "Observaciones",
		type: "text"
	},
	{
		label: "Vigencia",
		name: "vigencia",
		type: "select"
	},
	{
		label: "Fecha Solicitud",
		name: "FechaSolicitud",
		type: "date"
	},
	{
		label: "Inicio",
		name: "f_Inicio",
		type: "date"
	},
	{
		label: "Vencimiento",
		name: "f_Vencimiento",
		type: "date"
	},
	{
		label: "R. Automatica",
		name: "RAutomatica",
		type: "checkbox"
	},
	{
		label: "Baja",
		name: "Baja",
		type: "checkbox"
	},
	{
		label: "Motivo de Baja",
		name: "motivoBaja",
		type: "select"
	},
	{
		label: "Seccion",
		name: "seccion",
		type: "select"
	},
	{
		label: "Compania",
		name: "compania",
		type: "select"
	},
	{
		label: "Productor",
		name: "productor",
		type: "select"
	},
	{
		label: "Prima",
		name: "Prima",
		type: "number"
	},
	{
		label: "Premio",
		name: "Premio",
		type: "number"
	},
	{
		label: "Comision",
		name: "Comision",
		type: "number"
	},
	{
		label: "ART",
		name: "Art",
		type: "checkbox"
	},
	{
		label: "Patrimoniales",
		name: "Patrimoniales",
		type: "checkbox"
	},
	{
		label: "Capitas",
		name: "Capitas",
		type: "number"
	},
	{
		label: "Siniestros",
		name: "Siniestros",
		type: "number"
	},
	{
		label: "Patente Vehiculo",
		name: "PatenteVehiculo",
		type: "text"
	},
	{
		label: "Valor Asegurado",
		name: "ValorAsegurado",
		type: "number"
	},
	{
		label: "Medio de Pago",
		name: "medioDePago",
		type: "select"
	}
];

export const CoberturaFormFields = [
	{
		label: "Endoso",
		name: "Endoso",
		type: "number"
	},
	{
		label: "Riesgo",
		name: "Riesgo",
		type: "select"
	},
	{
		label: "Valor Asegurado",
		name: "ValorAsegurado",
		type: "number"
	},
	{
		label: "Prima",
		name: "Prima",
		type: "number"
	},
	{
		label: "Premio",
		name: "Premio",
		type: "number"
	},
	{
		label: "Fecha",
		name: "Fecha",
		type: "date"
	}
];

export const selectOptions = {
	seccion: {
		fieldName: "idSeccion",
		options: Secciones
	},
	compania: {
		fieldName: "idCompania",
		options: Companias
	},
	productor: {
		fieldName: "idProductor",
		options: Productores
	},
	medioDePago: {
		fieldName: "idMPago",
		options: MediosDePago
	},
	motivoBaja: {
		fieldName: "idMotivoBaja",
		options: MotivosBaja
	},
	tipoPersona: {
		fieldName: "TipoPersona",
		options: TiposPersona
	},
	Riesgo: {
		fieldName: "idRiesgo",
		options: Riesgos
	},
	vigencia: {
		fieldName: "idVigencia",
		options: Vigencias
	}
};
