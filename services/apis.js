export async function getNavMenuData() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/api/nav`)
    const data = await res.json()

    // Pass data to the page via props
    return { nav: { data } }
}
