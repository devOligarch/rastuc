const GET_DEVICE = `
query Query($getDeviceId: ID) {
  getDevice(id: $getDeviceId) {
    variant {
      brand
      color
      comesWith
      id
      model
      storage      
      thumbnail
      deviceType
      technicalSpecifications {
        connector
        dualSim
        foldable
        network
        ram
        releaseYear
        resolution
        screenSize
        screenType
        weight
      }
    }
    status
    slashedPrice
    imei
    images
    id
    currentPrice
    createdAt
    otherStorageOptions
    otherColorOptions
  }
}
`;

const ADD_TO_CART = `
mutation AddToCart($email: String, $device: ID) {
  addToCart(email: $email, device: $device) {
    cart {
      imei
    }
  }
}
`;

const GET_USER = `
  query GetUser($email: String) {
    getUser(email: $email) {
      id
      cart {
        id
        currentPrice
        slashedPrice
        variant {
          color
          comesWith
          model
          storage
          thumbnail
        }
      }
      email
      name
      image
      shipping{
        building
        suite
        town
        street
      }
    }
  }
`;

const REMOVE_FROM_CART = `
  mutation RemoveFromCart($email: String, $device: ID) {
    removeFromCart(email: $email, device: $device) {
      cart {
          id
          currentPrice
          slashedPrice
          variant {
            color
            comesWith
            model
            storage
            thumbnail
          }
        }
        email
        name
        image
    }
  }
  `;

const EDIT_SHIPPING = `
  mutation Mutation($editShippingId: ID, $building: String, $suite: String, $street: String, $town: String) {
    editShipping(id: $editShippingId, building: $building, suite: $suite, street: $street, town: $town) {
      shipping {
        building
        street
        suite
        town
      }
    }
  }
`;

export { GET_DEVICE, ADD_TO_CART, GET_USER, REMOVE_FROM_CART, EDIT_SHIPPING };
