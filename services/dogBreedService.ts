import axios from "axios";
import {DogBreed, DogBreedsById} from "@/types/DogBreed";
import * as FavoriteBreedService from "@/services/favoriteBreedService";

export async function fetchAllDogBreeds(): Promise<DogBreed[]> {
    try {
        const first = await axios.get("https://dogapi.dog/api/v2/breeds?page[number]=1&page[size]=10");
        const totalPages = first.data.meta.pagination.last;

        const firstPage = first.data.data.map((item: any) => ({
            id: item.id,
            name: item.attributes.name,
            description: item.attributes.description,
            life: item.attributes.life
        }));

        const requests = [];
        for (let i = 2; i <= totalPages; i++) {
            requests.push(axios.get(`https://dogapi.dog/api/v2/breeds?page[number]=${i}&page[size]=10`));
        }

        const results = await Promise.all(requests);
        const otherPages = results.flatMap((res) =>
            res.data.data.map((item: any) => ({
                id: item.id,
                name: item.attributes.name,
                description: item.attributes.description,
                life: item.attributes.life
            }))
        );

        return [...firstPage, ...otherPages];
    } catch (err) {
        console.error("Fetch error:", err);
        throw new Error("Internal Server Error");
    }
}

export async function fetchDogBreedById(id: string): Promise<DogBreedsById> {
    try {
        const response = await axios.get(`https://dogapi.dog/api/v2/breeds/${id}`);
        const breed = response.data.data;
        const favorite = await FavoriteBreedService.getFavoriteByBreedId(id); // memo를 포함한 결과

        return {
            ...breed,
            memo: favorite?.memo ?? undefined,
        }
    } catch (err) {
        console.error("Fetch error:", err);
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            throw new Error("Dog Breed Not Found");
        }
        throw new Error("Internal Server Error");
    }
}