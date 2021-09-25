import Row from 'jeddy/layouts/Row';
import RowAlign from 'jeddy/layouts/RowAlign';
import Div from 'jeddy/dom/Div';
import Theme from '../../Utils/Theme';
import Icon from 'jeddy/widgets/Icon';
import Icons from "jeddy/utils/Icons";
import FlatButton from '../../Utils/FlatButton';
import Card from "jeddy/widgets/Card";
import Center from "jeddy/layouts/Center";
import { connect } from 'jeddy/jredux';

const ToolBar = ({ user }) => {
    return Card({
        children: [
            Row({
                children: [
                    Div({
                        children: [Center({ child: `${user.displayName}` })],
                        style: { fontWeight: "bold" }
                    }),
                    Row({
                        children: [
                            FlatButton({
                                children: [Icon({ name: Icons.search }),],
                            }),
                            FlatButton({
                                children: [Icon({ name: Icons.more_vert }),],
                            }),
                        ]
                    })
                ],
                align: RowAlign.SpaceBetween,
                style: {
                    padding: "10px",
                    backgroundColor: 'white'
                }
            })
        ]
    })
}

const mapStateToProps = (state) => ({ ...state.RUser })

export default connect(mapStateToProps)(ToolBar);

