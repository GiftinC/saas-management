const ClientCard = ({ client }) => {
  return (
    <div className="tenant-card">
      <div className="tenant-card-header">
        <div className="tenant-initial">{client.name.charAt(0)}</div>
        <div className="tenant-name-email">
          <strong>{client.name}</strong>
          <p>{client.email}</p>
        </div>
      </div>
      <div className="tenant-badges">
        <span className={`status ${client.status.toLowerCase()}`}>
          {client.status}
        </span>
        <span className="plan">{client.plan}</span>
      </div>
      <div className="tenant-card-footer">
        <button className="manage-btn">Manage Products</button>
        <button className="edit-btn">✎</button>
      </div>
    </div>
  );
};

export default ClientCard;
