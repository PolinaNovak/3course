import {Breed} from "../models/breed.model";
import {Club} from "../models/club.model";
import {Ring} from "../models/ring.model";
import {Show} from "../models/show.model";
import {Expert} from "../models/expert.model";
import {Owner} from "../models/owner.model";
import {Dog} from "../models/dog.model";
import {Medal} from "../models/medal.model";
import {Pedigree} from "../models/pedigree.model";

export async function insertValues() {
  const breeds = await Breed.bulkCreate([
    {name: 'Labrador'},
    {name: 'Poodle'},
    {name: 'Bulldog'},
    {name: 'Pug'},
    {name: 'Chihuahua'},
  ]);

  const clubs = await Club.bulkCreate([
    {name: 'Paws and Claws'},
    {name: 'Fluffy Friends'},
    {name: 'Doggy Pals'},
    {name: 'Tails and Scales'},
    {name: 'Loyal Companions'},
  ]);

  const rings = await Ring.bulkCreate([
    {}, {}, {}, {}, {}
  ]);

  await Show.bulkCreate([
    {breed_id: breeds[0].id, ring_id: rings[0].id, date: '2023-10-24'},
    {breed_id: breeds[1].id, ring_id: rings[1].id, date: '2023-10-24'},
    {breed_id: breeds[0].id, ring_id: rings[3].id, date: '2023-11-10'},
    {breed_id: breeds[1].id, ring_id: rings[0].id, date: '2023-11-10'},
    {breed_id: breeds[2].id, ring_id: rings[4].id, date: '2023-11-10'},
  ], {returning: false});

  console.log(clubs);

  await Expert.bulkCreate([
    {name: 'John Smith', club_id: clubs[0].id, ring_id: rings[0].id},
    {name: 'Alex Mercer', club_id: clubs[2].id, ring_id: rings[0].id},
    {name: 'Jane Doe', club_id: clubs[2].id, ring_id: rings[1].id},
    {name: 'Bob Jones', club_id: clubs[1].id, ring_id: rings[2].id},
    {name: 'Sally Brown', club_id: clubs[4].id, ring_id: rings[3].id},
    {name: 'Fred Bloggs', club_id: clubs[3].id, ring_id: rings[4].id},
  ], {returning: false});

  const owners = await Owner.bulkCreate([
    {name: 'Alice', age: 20, club_id: clubs[0].id},
    {name: 'Bob', age: 50, club_id: clubs[1].id},
    {name: 'Charlie', age: 18, club_id: clubs[2].id},
    {name: 'Daisy', age: 22, club_id: clubs[3].id},
    {name: 'Eve', age: 30, club_id: clubs[4].id},
  ]);

  const dogs = await Dog.bulkCreate([
    {name: 'Rex', age: 6, breed_id: breeds[0].id, owner_id: owners[0].id},
    {name: 'Spot', age: 12, breed_id: breeds[0].id, owner_id: owners[1].id},
    {name: 'Rover', age: 3, breed_id: breeds[1].id, owner_id: owners[2].id},
    {name: 'Fido', age: 6, breed_id: breeds[1].id, owner_id: owners[3].id},
    {name: 'Buddy', age: 7, breed_id: breeds[1].id, owner_id: owners[4].id},
    {name: 'Duke', age: 8, breed_id: breeds[2].id, owner_id: owners[4].id},
  ]);

  await Medal.bulkCreate([
    {rank: 1, breed_id: breeds[0].id, dog_id: dogs[1].id},
    {rank: 2, breed_id: breeds[0].id, dog_id: dogs[0].id},
    {rank: 1, breed_id: breeds[1].id, dog_id: dogs[3].id},
    {rank: 2, breed_id: breeds[1].id, dog_id: dogs[2].id},
    {rank: 3, breed_id: breeds[1].id, dog_id: dogs[4].id},
    {rank: 2, breed_id: breeds[0].id, dog_id: dogs[0].id},
    {rank: 1, breed_id: breeds[1].id, dog_id: dogs[2].id},
    {rank: 3, breed_id: breeds[1].id, dog_id: dogs[4].id},
    {rank: 2, breed_id: breeds[2].id, dog_id: dogs[5].id},
  ], {returning: false});

  await Pedigree.bulkCreate([
    {father_id: dogs[1].id, son_id: dogs[0].id},
    {father_id: dogs[4].id, son_id: dogs[2].id},
  ], {returning: false});
}