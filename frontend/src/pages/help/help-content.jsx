const TabItem = () => {
    return [
        {
            key: "1",
            label: <span>All Tickets</span>,
        },
        {
            key: "2",
            label: <span>New</span>,
        },
        {
            key: "3",
            label:  <span>On-Going</span>
        },
        {
            key: "4",
            label: <span>Resolved</span>,
        },
    ].map((item) => {
        return { ...item };
    });
};

export default TabItem;