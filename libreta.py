import re


def printFormat(contacto):
    print("{")
    print(f"  'nombre': '{contacto['nombre']}'")
    print(f"  'telefono': '{contacto['telefono']}'")
    print("}")


def main():
    contactos = []

    while True:
        print("\n1. Agregar contacto")
        print("2. Buscar contacto")
        print("3. Actualizar contacto")
        print("4. Eliminar contacto")
        print("5. Salir")

        opcion = input("\nElige una opción: ")

        if opcion == "1":
            nombre = input("Nombre del contacto: ")
            telefono = input("Número de teléfono del contacto: ")
            contactos.append({"nombre": nombre, "telefono": telefono})
        elif opcion == "2":
            busqueda = input(
                "Introduce el nombre o número de teléfono a buscar: "
            ).lower()
            print("Resultados: [")
            if re.match(r"^[\d\s]+$", busqueda):
                for contacto in contactos:
                    if busqueda in contacto["telefono"]:
                        printFormat(contacto)
            else:
                for contacto in contactos:
                    if busqueda in contacto["nombre"].lower():
                        printFormat(contacto)
            print("]")
        elif opcion == "3":
            nombre = input("Nombre del contacto a actualizar: ")
            for contacto in contactos:
                if contacto["nombre"] == nombre:
                    nuevo_nombre = input("Nuevo nombre del contacto: ")
                    nuevo_telefono = input("Nuevo número de teléfono del contacto: ")
                    contacto["nombre"] = nuevo_nombre
                    contacto["telefono"] = nuevo_telefono
        elif opcion == "4":
            nombre = input("Nombre del contacto a eliminar: ")
            for contacto in contactos:
                if contacto["nombre"] == nombre:
                    contactos.remove(contacto)
        elif opcion == "5":
            break
        else:
            print("Opción no válida.")


if __name__ == "__main__":
    main()
