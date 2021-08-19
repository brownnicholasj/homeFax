import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      dob
      username
      homes {
        _id
        address {
          _id
          street1
          street2
          city
          state
          zip
        }
        areas {
          _id
          name
          icon
          attributes {
            _id
            type
            detail {
              _id
              key
              value
			  date
            }
          }
        }
      }
    }
  }
`;

export const QUERY_GET_HOME = gql`
query getHome($homeId: ID!) {
  home(homeId: $homeId) {
    _id
    address {
      street1
      street2
      city
      state
      zip
    }
    areas {
		_id
		name
		icon
		attributes {
		  _id
		  type
		  detail {
			_id
			key
			value
			date
		  }
		}
	}
  }
}
`

export const QUERY_TRANSFERS = gql`
query Transfers {
	transfers {
		_id
		transferer
		receiver
		home {
			address {
				street1
				street2
				city
				state
				zip
			}
		}
	}
}
`;

  
export const QUERY_SINGLE_TRANSFER = gql`
query Transfer($transferId: ID!) {
	transfer(transferId: $transferId) {
		_id
		transferer
		receiver
		home {
			address {
				street1
				street2
				city
				state
				zip
			}
		}
	}
}
`;
// Use graph and apollo to update user email
export const QUERY_UPDATE_USER = gql`
  {
    user {
      firstName
      lastName
      dob
      username
            }
          }
 `;

 export const QUERY_AREA = gql`
 query Area($areaId: ID!) {
   detail(areaId: $areaId) {
     _id
     name
     icon
   }
 }
 `;
 
 export const QUERY_ATTRIBUTE = gql`
 query Attribute($attributeId: ID!) {
   detail(attributeId: $attributeId) {
     _id
     type
   }
 }
 `;
 
 export const QUERY_DETAIL = gql`
 query Detail($detailId: ID!) {
   detail(detailId: $detailId) {
     _id
     key
     value
     date
   }
 }
 `;
 
   