const GET_DOCTORS = `
query MyQuery($speciality: String){
  retrieveHealthWorkers(searchFields: {specialty: $speciality}) {
    items {
      bio
      fullName
      specialty
      title
      sex
      privateOrganization {
        address
        name
      }
      practiceAddress
      profilePicture {
        fileName
        storageKey
        fileTitle
      }
       myPreferences {
          offersHomeCare
          offersClinicVisitCare
          offersTeleconsultCare
          homecarePrice
          clinicVisitPrice
          teleconsultPrice
        }
    }
  }
}

`;

export { GET_DOCTORS };
