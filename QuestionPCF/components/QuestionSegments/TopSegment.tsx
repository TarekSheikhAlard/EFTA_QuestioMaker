import React from 'react';
import { observer } from 'mobx-react';
import { useVM } from '../../viewModels/context';
import Ckeditor from '../UI/Ckeditor';
import { axa_questiontype } from '../../cds-generated/enums/axa_questiontype';
import {
  Dropdown,
  IconButton,
  IDropdownOption,
  IDropdownStyles,
  IImageStyles,
  Image,
  ImageFit,
  IStackItemStyles,
  makeStyles,
  MessageBar,
  setVirtualParent,
  Stack,
  TooltipHost
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';

const useStyles = makeStyles({
  RichText: {
    border: '1px solid #605e5c ',
    borderRadius: '2px',
    width: "100%",
  },
  RichTextDisblaed: {
    backgroundColor: '#f4f4f4',
  },
  error: {
    borderColor: 'red',
  },
  dropDown: {
    width: "100%",
    height: '3em',
  }
})

const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: {
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '46px',
  },
  caretDownWrapper: {
    top: "calc(50% - 14px)"
  }
}

const TopSegment = () => {
  const vm = useVM();
  const styles = useStyles();
  const tooltipId = useId('tooltip');
  const [error, setError] = React.useState<string>();

  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

  const validate = () => {
    if ((!vm.QuestionTitle || vm.QuestionTitle?.length < 1) && (!vm.QuestionTitleImageUrl || vm.QuestionTitleImageUrl?.length < 1)) {
      setError('Question Title is required')
      forceUpdate();
      return false
    } else if (vm.QuestionTitle.length > 2000) {
      setError('Question Title is too long')
      forceUpdate();
      return false
    }
    setError('')
    return true;
  }

  React.useEffect(() => {
    if (!vm.TopValidate) { vm.TopValidate = validate }
  }, [])

  const questionTypes = React.useMemo(() => {
    return Object.entries(axa_questiontype).map(([key, value]) => {
      if (typeof value !== 'string') return;
      if (value === "SCQ") return { key, text: "Single Choice" }
      if (value === "MCQ") return { key, text: "Multiple Choice" }
      return { key, text: value as string }
    }).filter((x): x is { key: string, text: string } => x !== undefined);
  }, []);

  const imageClickHandler = (event: any) => {
    Promise.resolve().then(() => {
      const inputElement = document.createElement("input");
      inputElement.style.visibility = "hidden";
      inputElement.setAttribute("type", "file");
      inputElement.setAttribute("accept", "image/jpg, image/jpeg, image/png");

      document.body.appendChild(inputElement);

      const target = event?.target as HTMLElement | undefined;

      if (target) {
        setVirtualParent(inputElement, target);
      }
      inputElement.onchange = async (ev: any) => {
        const files = ev.target.files || ev.dataTransfer.files
        if (files) {
          vm.QuestionTitleImageUrl = URL.createObjectURL(files[0]);
          vm.QuestionTitleImage = files[0];
        } else {
          console.log("no files")
          vm.QuestionTitleImageUrl = undefined;
          vm.QuestionTitleImage = undefined;
        }
        forceUpdate();
      };

      inputElement.click();

      if (target) {
        setVirtualParent(inputElement, null);
      }

      setTimeout(() => {
        inputElement.remove();
      }, 30000);
    });
  }

  const dropdownChangeHandler = (_e: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (!option) return;
    vm.QuestionType = option.key as unknown as number as axa_questiontype;
  }

  const deleteImage = async () => {
    vm.QuestionTitleImage = undefined;
    vm.QuestionTitleImageUrl = undefined;
    forceUpdate();
  }

  return (
    <Stack tokens={{ childrenGap: "1em" }} style={{ width: "100%" }}>
      <Stack horizontal verticalAlign="stretch" horizontalAlign="space-between" tokens={{ childrenGap: "1em" }} style={{ width: '100%' }}>
        <Stack.Item styles={{ ...stackItemStyles, root: { width: '72%' } }}>
          <Stack horizontalAlign='center' verticalFill verticalAlign='center' tokens={{ childrenGap: '0.5em' }} style={{ width: '100%' }}>
            {vm.isReadOnly ? (
              <Stack verticalAlign="center" styles={{
                root: {
                  borderRadius: '2px',
                  padding: '0.5em',
                  height: '100%',
                  width: "100%",
                  backgroundColor: '#f4f4f4',
                }
              }}>
                <div dangerouslySetInnerHTML={{ __html: vm.QuestionTitle }} />
              </Stack>
            ) : (
              <Stack horizontal horizontalAlign="start" verticalAlign='center' tokens={{ childrenGap: '0.5em' }} style={{ width: '100%' }}>
                <Ckeditor classNames={styles.RichText + " " + (error && styles.error) + (vm.isReadOnly && (" " + styles.RichTextDisblaed))} validation={validate} />
                <TooltipHost content="Add a photo" id={tooltipId} calloutProps={{ gapSpace: 0 }} styles={{ root: { display: 'inline-block' } }}>
                  <IconButton iconProps={{ iconName: 'Photo2', styles: { root: { fontSize: "1.5em", color: 'black' } } }} onClick={imageClickHandler} />
                </TooltipHost>
              </Stack>
            )}
            {error && (
              <MessageBar onDismiss={() => { setError('') }}>{error} </MessageBar>
            )}
          </Stack>
        </Stack.Item>
        <Stack.Item styles={{ ...stackItemStyles, root: { width: '22%' } }}>
          <Dropdown
            placeholder="Choose Type"
            options={questionTypes}
            disabled={vm.isReadOnly}
            selectedKey={vm.QuestionType ? questionTypes.find(x => x.key === vm.QuestionType.toString())?.key : undefined}
            className={styles.dropDown}
            styles={dropdownStyles}
            onChange={dropdownChangeHandler}
          />
        </Stack.Item>
      </Stack>
      {vm.QuestionTitleImageUrl &&
        <Stack horizontal tokens={{ childrenGap: "0.5em" }} >
          <Image
            imageFit={ImageFit.contain}
            src={vm.QuestionTitleImageUrl.slice(0, 4) === "blob" ? vm.QuestionTitleImageUrl : vm.QuestionTitleImageUrl + '&full=true'}
            styles={{ root: { boxShadow: '0 0 5px #ccc', maxHeight: '300px', maxWidth: "calc(100% - 32px)" } } as IImageStyles}
          />
          {!vm.isReadOnly && (
            <Stack tokens={{ childrenGap: "0.5em" }} >
              <IconButton iconProps={{ iconName: 'Delete', styles: { root: { fontSize: "1.5em", color: 'black' } } }} onClick={() => deleteImage()} />
            </Stack>
          )}
        </Stack>
      }
    </Stack>
  );
};

export default observer(TopSegment);
