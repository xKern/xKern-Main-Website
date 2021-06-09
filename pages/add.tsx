import EmployeeForm, { EmployeeDataFormFields, EmployeeDataServerResponse } from '@/components/employees/EmployeeForm';
import Meta from '@/components/Meta';
import Page from '@/components/page/Page';

const AddEmployeePage = () => {
  const send = async (fields: EmployeeDataFormFields): Promise<EmployeeDataServerResponse> => {
    const data = new FormData();
    data.append('firstName', fields.firstName);

    if (fields.middleName) {
      data.append('middleName', fields.middleName);
    }

    data.append('lastName', fields.lastName);
    data.append('identification', fields.identification);
    data.append('id', fields.id);
    data.append('department', fields.department);
    data.append('mobile', fields.mobile);
    data.append('email', fields.email);
    data.append('bloodGroup', fields.bloodGroup);
    data.append('dob', fields.dob);
    data.append('joiningDate', fields.joiningDate);
    data.append('maritalStatus', fields.maritalStatus);
    data.append('address', fields.address);
    data.append('designation', fields.designation);
    data.append('authCode', fields.authCode);
    data.append('photo', fields.photo);
    data.append('idScan', fields.idScan);

    const res = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_API_ENDPOINT}/employee/create`, {
      method: 'POST',
      body: data
    });

    const json: EmployeeDataServerResponse = await res.json();
    return json;
  };

  return (
    <Page title="Add Employee" subtitle="Use this form to add employee data to the database.">
      <Meta
        title="Add Employee"
        description="Add employee data."
        url="/add"
      />

      <EmployeeForm send={send} />
    </Page>
  );
};

export default AddEmployeePage;
