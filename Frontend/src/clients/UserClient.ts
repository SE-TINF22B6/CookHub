import {backendUrl} from "../App";

export class UserClient {

    public async isLoggedIn() {
        try {
            const response = await fetch(`https://${backendUrl}/Login/is-logged-in/`, {
                method: 'GET',
                credentials: 'include',
            });


            return response;

        } catch (error) {
            console.error(error);
        }
    }

    public async logOut() {
        try {
            const response = await fetch(`https://${backendUrl}/Login/log-out`, {
                method: 'GET',
                credentials: 'include',
            });
            console.log(response);

            return response;

        } catch (error) {
            console.error("Netzwerkfehler: ", error);
        }
    }

    public async userLogin(email: string, password: string) {
        try {
            const response = await fetch(`https://${backendUrl}/Login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',


                },
                body: JSON.stringify({'email': email, 'password': password}),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Response was not ok.');
            }

            return response.status;


        } catch (error) {
            console.error('Failed to log in:', error);

        }
    }

    public async getLikedRecipes(userId: number | undefined) {
        try {
            const response = await fetch(`https://${backendUrl}/User/${userId}/liked-recipes`, {
                method: 'GET',
                credentials: 'include',
            });


            return response.json();
        } catch (error) {
            console.error(error);
        }
    }


    public async viewRecipe(recipeId: number) {
        try {
            const response = await fetch(`https://${backendUrl}/User/view-recipe/${recipeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                credentials: 'include',
            });


            return response.ok;

        } catch (error) {
            console.error('Failed to view Recipe:', error);

        }
    }


    public async getOwnRecipes() {
        try {
            const response = await fetch(`https://${backendUrl}/User/own-recipes`, {
                method: 'GET',
                credentials: 'include',
            });


            return response.json();
        } catch (error) {
            console.error(error);
        }
    }

    public async getViewedRecipes() {
        try {
            const response = await fetch(`https://${backendUrl}/User/viewed-recipes`, {
                method: 'GET',
                credentials: 'include',
            });


            return response.json();
        } catch (error) {
            console.error(error);
        }
    }


    public async userSignup(name: string, email: string, password: string) {
        let response;
        try {
            response = await fetch(`https://${backendUrl}/Login/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'name': name, 'email': email, 'password': password}),
                credentials: 'include',

            });

            if (!response.ok) {
                return response.text();
            }

        } catch (error: any) {
            console.error(error);
            console.log(response?.text());
            return response?.text() ?? "";
        }

        return "";
    }

    public async likeRecipe(userId: number, recipeId: number) {
        let response = await fetch(`https://${backendUrl}/User/like-recipe/${userId}/${recipeId}`, {
            method: 'POST',
            credentials: 'include'
        });

        return response.ok ? '' : response?.text();
    }

    public async unlikeRecipe(userId: number, recipeId: number) {
        let response = await fetch(`https://${backendUrl}/User/unlike-recipe/${userId}/${recipeId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        return response.ok ? '' : response?.text();
    }

    public async deleteAccount(password: string) {
        let response;
        try {
            response = await fetch(`https://${backendUrl}/User/delete-account`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(password),
                credentials: 'include'
            });

            return response.text();
        } catch (error) {
            console.log(error);
            // TODO: display error (?)
            return await response?.text() ?? '';
        }
    }

    async changeUsername(newName: string) {
        try {
            const response = await fetch(`https://${backendUrl}/User/change-username`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newName),
                credentials: 'include'
            });

            if (!response.ok) {
                return response.text();
            }

            return response.status;
        } catch (error: any) {
            console.error(error);
            return "";
        }
    };

    async changeProfilePicture(imageUrl: string | null) {
        try {
            //actualy change the ProfilePicture
            const response = await fetch(`https://${backendUrl}/User/change-profile-picture`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(imageUrl),
                credentials: 'include'
            });

            if (!response.ok) {
                return response;
            }

            return response.ok;
        } catch (error: any) {
            console.error(error);
            return "";
        }
    }

    async deleteProfile(password: string) {
        const response = await fetch(`https://${backendUrl}/User/delete-account`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(password),
            credentials: 'include'
        });

        if (!response.ok) {
            return response;
        }

        return response;
    }

    async changePassword(oldPassword: string, newPassword: string) {
        try {
            const response = await fetch(`https://${backendUrl}/User/change-password`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'oldPassword': oldPassword, 'newPassword': newPassword}),
                credentials: 'include',
            });

            if (!response.ok) {
                return response.text();
            }


            return response.status;
        } catch (error: any) {
            console.error(error)

        }
    }


}