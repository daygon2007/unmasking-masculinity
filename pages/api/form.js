export default function handler(req, res) {
    const body = req.body;

    if(!body.name || !body.email || !body.message){
        return res.status(400).json({data: "Name, email, and message fields are required."});
    }
    return res.status('200').json({ data: "Form has sucessfully submitted. Thanks!" });
}