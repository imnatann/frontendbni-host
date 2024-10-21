import { IBaseResponseService } from "@smpm/models";
import { IFormInputSignIn, ISignInModel } from "@smpm/models/authModel";
import axios from "@smpm/services/axios";

export const signIn = async (
  data: IFormInputSignIn
): Promise<IBaseResponseService<ISignInModel>> => {
  const response = await axios.post("/auth/sign-in", data);
  return response.data;
};

export const signOut = async (): Promise<IBaseResponseService<null>> => {
  const response = await axios.get("/auth/sign-out");
  return response.data;
};


interface User {
  id: number;
  name: string;
  email: string;
  // Tambahkan properti user lainnya jika diperlukan
}

class AuthService {
  // Contoh metode untuk mendapatkan data pengguna saat ini
  async getCurrentUser(token: string): Promise<User> {
    try {
      const response = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as User;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
}

export default new AuthService();