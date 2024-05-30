import React, { useContext, useEffect, useState } from 'react';
import UserEditable from './UserEditable';
import axiosConfig from '../utils/config/axios.config';
import { AuthContext } from '../utils/Interfaces/AuthInterface';
import { IUser } from '../utils/Interfaces/back/IUser.interface';

const UserConfiguration = () => {

    const { user: authUser } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState<IUser | null>(null);
    type UserField = keyof IUser;

    useEffect(() => {
        if (authUser) {
            axiosConfig.get<IUser>(`/users/${authUser.id}`)
                .then(response => {
                    setUserDetails(response.data);
                })
                .catch(error => {
                    console.error('Error fetching detailed user data:', error);
                });
        }
    }, [authUser]);

    const handleSave = (field: UserField, newValue: IUser[UserField]) => {
        if (userDetails) {
            axiosConfig.put(`/users?id=${userDetails._id}`, { [field]: newValue })
                .then(response => {
                    setUserDetails(prevDetails => {
                        return prevDetails ? { ...prevDetails, [field]: newValue } : prevDetails;
                    });
                    console.log('Data updated successfully');
                })
                .catch(error => {
                    console.error('Error updating user data:', error);
                });
        }
    };

    if (!userDetails) return <div>Loading...</div>;

    return (
        <div>
          <UserEditable label="Nombre" value={userDetails.name ? userDetails.name : 'eror al cargar'} onSave={(newValue: string | number) => handleSave('name', newValue)} />
          <UserEditable label="Email" value={userDetails.email ? userDetails.email : 'error al cargar'} onSave={(newValue: string | number) => handleSave('email', newValue)} />
          <UserEditable label="Edad" value={userDetails.age ? userDetails.age.toString() : 'error al cargar'} onSave={(newValue: string) => handleSave('age', parseInt(newValue, 10))} />
          <UserEditable label="Telefono" value={userDetails.phone ? userDetails.phone : 'error al cargar'} onSave={(newValue: string | number) => handleSave('phone', newValue)} />
        </div>
      );
};

export default UserConfiguration;