Access Policy List

***RBAC***

Admin

Route:

- /api/data (Get list data) (REST Method GET)
- /api/data (Store / add data) (REST Method POST)
- /api/data/:id (Delete Data) (REST Method DELETE)

User

Route:

- /api/data (Get list data) (REST Method GET)
- /api/data (Store / add data) (REST Method POST)

GUEST

Route:

- /api/data (Get list data) (REST Method GET)

***ABAC***

Admin

Route:

- /api/data/:id (Get one data depend on created_by field from data) (REST Method GET)

User

Route:

- /api/data/:id (Get one data depend on created_by field from data) (REST Method GET)


Guest

Route:

- /api/data/:id (Get one data depend on created_by field from data) (REST Method GET)

***RBAC & ABAC***

Admin

Route:

- /api/data (Edit data the only one allowed is authorized role write) (REST Method PUT)

User

Route:

- /api/data (Edit data the only one allowed is authorized role write) (REST Method PUT)
