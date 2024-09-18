"use server";
import { auth } from "@/auth";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
    const session = await auth();
    const accessToken = session?.accessToken;

    return {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    };
};

export const getAllStatistics = async () => {
    const headers = await authConfig();
    try {
        const response = await fetch(`${BASE_URL}/dashboard`, {
            headers,
            cache: "no-cache",
            // next: { revalidate: 1800 }
        });
        const data = await response.json();
        if (response.ok) {
            return data.statistics;
        } else {
            throw new Error(
                data.message || "Something went wrong, Please try again!"
            );
        }
    } catch (error: any) {
        return { error: error.message };
    }
};
