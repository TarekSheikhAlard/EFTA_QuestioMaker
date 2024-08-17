import {
  IconButton,
  IStackStyles,
  ITextFieldStyles,
  makeStyles,
  setVirtualParent,
  Stack,
  TextField,
  TooltipHost,
  Image,
  IImageStyles,
  IIconStyles,
  IIconProps
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { IOption } from '../../../cdsService/cdsSerivce';
import { useVM } from '../../../viewModels/context';
import OrderArrows from '../../UI/OrderArrows';
import { IOptionError } from './ScQuestion';

const useStyles = makeStyles({
  showOnHover: {
    ' .showAndHide': {
      display: 'none',
      TransitionEvent: 'display 0.5s ease-in-out',
    },
    ':hover .showAndHide': {
      display: 'block',
      TransitionEvent: 'display 0.5s ease-in-out',
    }
  },
  radioButtonInput: {
    height: '2em',
    width: '1.5em',
    margin: '0 !important',
    marginLeft: '0.1em',
    marginRight: '0.1em',
  }
})

interface props {
  removeOption: (option: IOption, index: number) => void;
  validateInput: (index: number) => void;
  option: IOption,
  index: number,
  optionError: IOptionError,
  isThereOther: boolean,
  isThereNoneofabove: boolean,
  isThereAllofabove: boolean,
}

const ScqOption = ({
  option,
  index,
  isThereOther,
  isThereAllofabove,
  isThereNoneofabove,
  optionError,
  validateInput,
  removeOption
}: props) => {
  const vm = useVM();
  const styles = useStyles();
  const tooltipId = useId('tooltip');
  const [controlledOptionTitle, setControlledOptionTitle] = useState<string>(option.title);
  let timeout: NodeJS.Timeout

  useEffect(() => {
    setControlledOptionTitle(option.title);
  }, [vm.QuestionSCOptions])

  useEffect(() => {
    // with a 500ms timeout, update the vm.QuestionSCOptions[index].title to the controlledOptionTitle
    if (controlledOptionTitle === option.title) return;
    vm.makeFormDirty();

    timeout = setTimeout(() => {
      const newOptions = [...vm.QuestionSCOptions];
      vm.QuestionSCOptions[index].title = controlledOptionTitle ? controlledOptionTitle : '';
      vm.QuestionSCOptions = newOptions;
      if (optionError.isError) validateInput(index)
    }, 500);

    return () => { if (timeout) clearTimeout(timeout) };
  }, [controlledOptionTitle])

  const imageClickHandler = (event: any, index: number) => {
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
          vm.QuestionSCOptions[index].imageUrl = URL.createObjectURL(files[0])
          vm.QuestionSCOptions[index].image = files[0] as File;
          vm.QuestionSCOptions = [...vm.QuestionSCOptions];
        } else {
          console.log("no files")
          vm.QuestionSCOptions[index].imageUrl = undefined;
          vm.QuestionSCOptions[index].image = undefined;
          vm.QuestionSCOptions = [...vm.QuestionSCOptions];
        }
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

  const deleteImage = async (index: number) => {
    vm.QuestionSCOptions[index].imageUrl = undefined;
    vm.QuestionSCOptions[index].image = undefined;
    vm.QuestionSCOptions = [...vm.QuestionSCOptions];
  }

  return (
    <Stack.Item order={option.order} >
      <Stack horizontal verticalAlign='center' horizontalAlign='space-between' styles={{ root: { width: '100%' } } as IStackStyles} tokens={{ childrenGap: '0.5em' }}>
        <Stack grow>
          <Stack
            className={styles.showOnHover}
            horizontal
            styles={{ root: { width: '100%' } } as IStackStyles}
            tokens={{ childrenGap: '0.5em' }}
            verticalAlign='center'
          >
            {!vm.isReadOnly && (
              <Stack styles={{ root: { width: '2em' } }} disableShrink>
                <OrderArrows order={option.order} index={index} isOther={option.isOther} isThereOther={isThereOther} isThereTwoOther={(isThereAllofabove && isThereNoneofabove) ? true : false} />
              </Stack>
            )}
            <Stack horizontalAlign='center' verticalAlign='center' disableShrink >
              <input
                id={option.id.toString()}
                type="radio"
                value={option.id}
                checked={option.isCorrect}
                readOnly={vm.isReadOnly}
                name="option"
                className={styles.radioButtonInput}
                onChange={() => {
                  if (vm.isReadOnly) return;
                  vm.QuestionSCOptions = vm.QuestionSCOptions.map((option) => { option.isCorrect = false; return option })
                  vm.QuestionSCOptions[index].isCorrect = !vm.QuestionSCOptions[index].isCorrect;
                  //this is a cheeky way of causing a rerender, because otherwise the radiobutton isn't rerendering and it stays unchecked
                  //im not sure if this will cause future bugs or anything but as far as i know, it shouldn't
                  vm.QuestionSCOptions = [...vm.QuestionSCOptions]
                }} />
            </Stack>
            <TextField
              maxLength={750}
              errorMessage={optionError?.errorMessage}
              placeholder='Option Title'
              readOnly={option.isOther || vm.isReadOnly}
              value={controlledOptionTitle}
              {...(option.isOther ? { borderless: true } : { multiline: true, autoAdjustHeight: true, underlined: true, height: 32 })}
              styles={{ root: { width: "75%", }, fieldGroup: { minHeight: 32 }, field: { resize: "none", } }}
              onBlur={() => {
                if (controlledOptionTitle === option.title || !controlledOptionTitle) return;
                clearTimeout(timeout)
                const newOptions = [...vm.QuestionSCOptions];
                vm.QuestionSCOptions[index].title = controlledOptionTitle ? controlledOptionTitle : '';
                vm.QuestionSCOptions = newOptions;
                if (optionError.isError) validateInput(index)
              }}
              onChange={(_e, value) => {
                setControlledOptionTitle(value || '');
              }}
            />
            {!option.isOther && !vm.isReadOnly && (
              <div className="showAndHide">
                <TooltipHost content="Add a photo" id={tooltipId} calloutProps={{ gapSpace: 0 }} styles={{ root: { display: 'inline-block' } }}>
                  <IconButton
                    iconProps={{ iconName: 'Photo2', styles: { root: { fontSize: "1em", color: 'black' } } }}
                    onClick={(event) => { imageClickHandler(event, index) }}
                  />
                </TooltipHost>
              </div>
            )}
          </Stack>
          {option.imageUrl && (
            <Stack horizontal styles={{ root: { margin: '0.5rem 0.5rem 0.5rem 5rem !important' } }} >
              <Image height="100px"
                src={option.imageUrl}
                styles={{ root: { boxShadow: '0 0 5px #ccc' } } as IImageStyles}
              />
              {!vm.isReadOnly && (
                <Stack tokens={{ childrenGap: "0.5em" }} >
                  <IconButton iconProps={{ iconName: 'Delete', styles: { root: { fontSize: "1.5em", color: 'black' } } }} onClick={() => deleteImage(index)} />
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
        <Stack.Item styles={{ root: { width: '2em' } }} disableShrink>
          {!vm.isReadOnly &&
            (isThereOther ?
              (isThereAllofabove && isThereNoneofabove) ? (
                (vm.QuestionSCOptions.length > 3 || option.isOther) && (
                  <IconButton iconProps={{ iconName: 'ChromeClose', styles: { root: { color: 'black' } } as IIconStyles } as IIconProps} onClick={() => removeOption(option, index)} />
                )
              ) : (
                (vm.QuestionSCOptions.length > 2 || option.isOther) && (
                  <IconButton iconProps={{ iconName: 'ChromeClose', styles: { root: { color: 'black' } } as IIconStyles } as IIconProps} onClick={() => removeOption(option, index)} />
                )
              ) : vm.QuestionSCOptions.length > 1 && (
                <IconButton iconProps={{ iconName: 'ChromeClose', styles: { root: { color: 'black' } } as IIconStyles } as IIconProps} onClick={() => removeOption(option, index)} />
              )
            )
          }
        </Stack.Item>
      </Stack>
    </Stack.Item >
  );
};

export default observer(ScqOption);
