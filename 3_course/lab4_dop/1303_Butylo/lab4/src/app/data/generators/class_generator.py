import random
import string
import json


def generate_unique_class_names(count):
    class_names = set()

    while len(class_names) < count:
        class_number = random.randint(1, 38470)
        class_letter = random.choice(string.ascii_uppercase)
        class_name = f"{class_number}{class_letter}"
        class_names.add(class_name)

    return list(class_names)


class_names_res = generate_unique_class_names(1000000)

with open('class_names.json', 'w', encoding='utf-8') as f:
    json.dump(class_names_res, f, ensure_ascii=False, indent=4)
