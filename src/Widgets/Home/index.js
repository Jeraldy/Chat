import ContactList from "./ContactList";
import { connect } from "jeddy/jredux";
import Center from "jeddy/layouts/Center";

const Home = ({ hasContacts }) => {
    return hasContacts ? ContactList() : NoContacts()
}

const NoContacts = () => {
    return Center({ child: "No contacts yet!" })
}

const mapStateToProps = (state) => ({
    hasContacts: state.RUser.contacts.length || state.RGroup.groups.length
})

export default connect(mapStateToProps)(Home);
