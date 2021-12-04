import ErrorPage from "@components/ErrorPage";
import { custom500Content } from "@constants";
import ErrorPageLayout from "@layouts/ErrorPageLayout";

const Custom500 = () => {
  return (
    <ErrorPageLayout>
      <ErrorPage
        pageTitle={custom500Content.pageTitle}
        imgUrl={custom500Content.imgUrl}
        errorHeading={custom500Content.errorHeading}
        errorContent={custom500Content.errorContent}
      />
    </ErrorPageLayout>
  );
};

export default Custom500;
