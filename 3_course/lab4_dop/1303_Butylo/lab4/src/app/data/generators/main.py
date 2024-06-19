import numpy as np
from faker import Faker
import json

fake = Faker('ru_RU')


def generate_male_fio():
    while True:
        yield {
            "firstName": fake.first_name_male(),
            "lastName": fake.last_name_male(),
            "patronymic": fake.middle_name_male()
        }


def generate_female_fio():
    while True:
        yield {
            "firstName": fake.first_name_female(),
            "lastName": fake.last_name_female(),
            "patronymic": fake.middle_name_female()
        }


def generate_unique_male_fio_components(count):
    collection = []

    male_fio = generate_male_fio()
    female_fio = generate_female_fio()

    while len(collection) < count * 2:
        collection.append(next(male_fio))
        collection.append(next(female_fio))

    return collection


fio = generate_unique_male_fio_components(500000)

with open('fio_data.json', 'w', encoding='utf-8') as f:
    json.dump(fio, f, ensure_ascii=False, indent=4)
