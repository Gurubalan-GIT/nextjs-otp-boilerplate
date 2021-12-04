import ErrorPage from "@components/ErrorPage";
import { custom403Content } from "@constants";
import ErrorPageLayout from "@layouts/ErrorPageLayout";

const Custom403 = () => {
  return (
    <ErrorPageLayout>
      <ErrorPage
        pageTitle={custom403Content.pageTitle}
        imgUrl={custom403Content.imgUrl}
        errorHeading={custom403Content.errorHeading}
        errorContent={custom403Content.errorContent}
      />
    </ErrorPageLayout>
  );
};

export default Custom403;
