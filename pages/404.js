import ErrorPage from "@components/ErrorPage";
import { custom404Content } from "@constants";
import ErrorPageLayout from "@layouts/ErrorPageLayout";

const Custom404 = () => {
  return (
    <ErrorPageLayout>
      <ErrorPage
        pageTitle={custom404Content.pageTitle}
        imgUrl={custom404Content.imgUrl}
        errorHeading={custom404Content.errorHeading}
        errorContent={custom404Content.errorContent}
        buttonText={custom404Content.buttonText}
      />
    </ErrorPageLayout>
  );
};

export default Custom404;
