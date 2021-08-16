import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  console.log(user)
  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to the Future</Link>

        {user ? (
          <>
            <h2>
              Homes belonging to {user.firstName} {user.lastName}
            </h2>
            {user.homes.map((home) => (
              <div key={home._id} className="my-2">
                <div className="flex-row">
                  <ul>
                    <li>{home.address.street1}</li>
                    {home.address.street2 ? (
                      <li>{home.address.street2}</li>
                    ) : null}
                    <li>{home.address.city}</li>
                    <li>{home.address.state}</li>
                    <li>{home.address.zip}</li>
                    <li>Areas:</li>
                    {home.areas.map(area => (
                      <ul>
                        <li key={area._id}>{area.name}</li>
                        {area.attributes.map(att => (
                          <ul>
                            <li key={att._id}>{att.type}</li>
                            <ul>
                            {att.detail.map(detail => (
                                <li key={detail._id}><label>{detail.key}: </label><span>{detail.value}</span></li>
                                ))}
                            </ul>
                          </ul>
                        ))}
                      </ul>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
