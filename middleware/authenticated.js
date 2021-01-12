export default ({ store, redirect, from, error }) => {
    if (!store.state.user.user) {
        return redirect(302, "/#login")
        // return redirect("/?status=redirected")
    }
}