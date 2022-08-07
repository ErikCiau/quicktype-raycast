import { Action, ActionPanel, Clipboard, Form, showHUD, showToast, Toast, popToRoot } from "@raycast/api";
import { languages } from "./langSupport";
import { quicktypeJson } from "./quicktype-core";

export default function Command() {
  const handlerForm = async ({ json, rootName, lang }: { lang: string; rootName: string; json: string }) => {
    try {
      const types = await quicktypeJson({ json, rootName, lang });
      await Clipboard.copy(types);
      await showToast({ title: "Copy to clipboard successfully", style: Toast.Style.Success });
      setTimeout(async () => {
        await showHUD("Happy conding 🧑🏻‍💻");
      }, 1000);
    } catch (error) {
      await showToast({ title: "Error to generate types, verify your input`s", style: Toast.Style.Failure });
      await popToRoot();
    }
  };

  return (
    <Form
      navigationTitle="QuickType"
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handlerForm} title="Generate types" />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="lang" title="Select language" defaultValue="typescript">
        {languages.map((lang) => (
          <Form.Dropdown.Item key={lang.id} title={lang.title} value={lang.value} />
        ))}
      </Form.Dropdown>
      <Form.Separator />
      <Form.TextField id="rootName" title="Interface root" defaultValue="IMagic" />
      <Form.Separator />
      <Form.TextArea id="json" title="Paste your Json" />
    </Form>
  );
}
