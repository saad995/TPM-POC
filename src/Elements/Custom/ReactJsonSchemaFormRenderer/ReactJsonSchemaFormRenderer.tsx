import "./ReactJsonSchemaFormRenderer.scss";
import Form from "@rjsf/bootstrap-4";

function ReactJsonSchemaFormRenderer(props: any) {
    const { schema, uiSchema, formData, showErrorList, callback, ...others } = props;

    function transformErrors(errors: any[]) {
        return errors.map((error: { name: string; message: string }) => {
            
            if (error.name === "pattern") {
                error.message = "Only digits are allowed";
            }
            return error;
        });
    }

    return (
        <Form
            // noHtml5Validate={true}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            showErrorList={showErrorList}
            // transformErrors={transformErrors}
            onSubmit={(aaa) => {
                callback(aaa);
                return false;
            }}
        />
    );
}

export default ReactJsonSchemaFormRenderer;
