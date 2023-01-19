const getLs = (clave) => {
    return JSON.parse(localStorage.getItem(clave))
}

const loadLs = ( clave, valor ) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

const cleanLs = (clave) => {
    localStorage.removeItem(clave)
}