import Badge from 'react-bootstrap/Badge';

function PillExample({ type }) {
    const mapTypeBg = {
        'PENDING': "info",
        'VERIFIED': "success",
        'WAITING UPDATE': "warning",
        'PENDING': "info",
        'CONFIRM': "success",
        'BREACH': "danger",
        'IN CONTRACT': "warning",
        'ENDED': "dark",
    }

    return (
        <Badge pill bg={mapTypeBg[type]}>
            {type}
        </Badge>
    )
}
export default PillExample;