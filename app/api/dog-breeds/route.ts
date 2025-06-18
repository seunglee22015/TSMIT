// // import { NextResponse } from "next/server";
// import { NextRequest, NextResponse } from "next/server";
// import * as DogBreedsService from "@/services/dogBreedService";

// import { DogBreed } from "@/types/DogBreed";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ breeds: DogBreed[] }> }
// ) {
//   try {
//     const breeds = await DogBreedsService.fetchAllDogBreeds();

//     return NextResponse.json(breeds);
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred while processing your request." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import * as DogBreedsService from "@/services/dogBreedService";

export async function GET() {
    try {
        const breeds = await DogBreedsService.fetchAllDogBreeds();

        return NextResponse.json(breeds);
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}
