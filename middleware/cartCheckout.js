export default async({ req, route, redirect }) => {
  if(req && route.path.match(/cart\/.+/)) return redirect("/cart")
}