const ClientController = {
    HomePage(req, res){
        return res.render(
            'client/home',
            {layout: false}
        )
    }
}

module.exports = ClientController