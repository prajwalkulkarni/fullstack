import UsersList from "../user/components/UsersList";


export default function Users(){

    const DUMMY_ITEMS=[
        {
            id:'u1',
            name:'Manu',
            image:'https://pbs.twimg.com/media/FDwvnoeXMAofp5t?format=jpg&name=large',
            places:3
        }
    ]
    return <UsersList items={DUMMY_ITEMS}/>
}