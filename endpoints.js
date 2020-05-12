import { apiUrl } from "./globals";

//get
export const endpointRegisterEmail = `${apiUrl}/register/1/`;
export const endpointCheckEmail = `${apiUrl}/get/profile/checkmail/`;
export const endpointGetPotentials = `${apiUrl}/get/potentials/`;
export const endpointGetProfile = `${apiUrl}/get/profile/`;
export const endpointRegisterProfile = `${apiUrl}/register/2/`;

//post
export const endpointSetGPS = `${apiUrl}/set/gps`;
export const endpointMatchResponses = `${apiUrl}/set/matchresponses`;
export const endpointSetCriteria = `${apiUrl}/set/criteria`;
export const endpointSetPhotos = `${apiUrl}/set/photos`;
export const endpointSetProfileText = `${apiUrl}/set/profile/text`;
export const endpointSetProfile = `${apiUrl}/set/profile`;
export const endpointSetProperties = `${apiUrl}/set/properties`;