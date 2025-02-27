import { LanguageKey } from './language'

export type Options = {
  from: LanguageKey
  to: LanguageKey
  tld?: string
  type?: Lowercase<RcpIdsKeys>
  isMobile?: boolean
  proxy?: string
}

export type Result = DefaultResult | WordResult

export type DefaultResult = {
  from: LanguageKey
  pronunciation: string | null
  text: string
}

export type WordResult = {
  text: string
  common: CommonType[]
}

type CommonType = {
  type: string
  words: WordExplain[]
}

type WordExplain = {
  word: string
  explains: string[]
  frequency: number
}

export enum BatchExecute {
  MOBILE = '[";MS-4L2LQAAZVbL_HdWxfNm3AgZkJywwmACkAIwj8RigqBncmLg185qOW1jp2bwl8aCZjVHIroRlAyeikYihCFiwvKh8AAAC6TwAAAAR1AQcXADnjTVI6_b56aIt6jome8mrFoy6kuqpaad5hJdcjF5vRxQwNcY47w8b8f7xehcm0VB8J9aoSoVViBHCEApY3faUPeAVmgcMzX_n9CbA3H-RAxlultCzUrkbpy69q0G_yrRjP40cmf9FKM0aYwLFYgjli4ClOZ0Cy_DZSv76JPzz-2I1TmbJe43-zBDKI9OCXTbE0Yg35VJw7cbpgf_Ls3ULUMy4_TRhAQ5N3e_cUUL6ZCht9rQqMMenCtHMzJS1EeWiKo_-Bh4-EkFJxoIOP7dCZMQfqz7hrJPP8ofKI364vYdmrW2ONFq8cz0BWbqvpRp7Pc9_npcen3s4SfDsFAVYtAqufS7lXaOnefi4pjGP1I9u6V-h4LuLDF4ZRHkMUJJkm4yU3whEz8VxRxK7jhZpHsg3MyvZImh7s-erqo3edS0Q_811LS40_1t0QfP0d91yLK9QVHy8FoMdO3rcoBZUPuu-DLBehJbIA6K1NMNZx0bEaTmbXYf_qWJ0UmyyoPL62HuLx8sSjxaVq6aZS_tCnoLrW1Vp7WV2VLS3hYm9MbPZcilzQlDx0qQZk2BVZ5HLrdn7IQ-dWUa82tyrMuriz9YgBTOh7AxTGCEgpCTG7CT1PsjbuFh0mmSCdJHqsYb0bAAurCL2j9wMIvEKmsxGlwZfwDHkY9WTLSO8VgHYFn1opCEN_9LGf0m0E83asgA8JvXh5n-vSAm2EQm7ine9C4I_czi81pAXciz3EhzcXdHPV2wLsCgSVudbetISbkqYxto_2nompwq8LGv4V5dgplac8CmPXrtkDG-svKMGlGVVd2MJmvdZ0X1L_Hz6_aoEiUY-Nqmha0P631urEH8UujRFV5Nz6lOS799rtdRU5AKappXTDckHXCrhsFkx6g2r3l5UE9pdvEvqAAQgrTeS4T6_cJ84gJR3UiSzqEl8uSHWqau87-6RHE4gPaQuoiQOiZg",null,null,426,29,null,null,0,"2"]',
  PC = '[";xdu425bQAAZVbL_HdWxfJGZfeXgQdSAmACkAIwj8Rol9p0xXYA6iT5wRunruTrduUuXi08CKpuhNTpZWMRkuxKuMAB8AAADyTwAAAAN1AQcXALNdaTASC9AXhnsFEhyF7MEg2CJBVW1ZWWYxNtZ_n9ec1DoqNpvOVOB1cxWbzu4LLnBDNPxNx9Lf5qCyh99AKzyky3ZxgiCLAha4DuBN0Ekd24bHo2IwkTCTj9ZXMFQAdOl7pzzsCM2-1MNr6U2VvRTirE7VrWeJyXypivCPwhny2QYgOTcG0FPkgz3d5xCipsXPXCfdnJ2U6hdlt39cI-XJUc0OdLNXoqw7d5elL-2F3LEWkoQCJDvwLbkHXMoWaj5PwjHr7561oC9XqMncHk5w-qHnlppii7BDTKGh5HAWfcQlqTNK4yu9y3W_uPltoFIsxx0CTW1Rkz3N11qd_oM6Sp0IvWw1vIKj3IEvRkUoCT4Hql5KRzV1FE8wDFZHtr9ghXGKH1vXkxeuI5fiGUikdcXluZnHnjI9KqcbdBwM2cG9zZmr-3fgeEnoRJkrNM8oEmurIwEhurX-mc-pqfnO6mW5xwio6_R-leTf71jDo7PY-OVwdqDm0l6bELBGXbxKylGMHdbJ1qymJcVpfC0o6U9Ru5OFtzTYaPgD3ThA6pleS2PPuD8Lrbo9oCz0Mk2KIhGIkglrub8OtzbFejo-OoLrSqXrLoRF-v7tPMpJr1Xf-tqsCT6TaKIjMF_g90jVdApbkxfeRoZ6Y5aXxf01LzAqcvDKuW_5592p9fCXeDoql2W5eBPsbzJJrgxC2cXPP2ia0dqvINlZdu2zfLIGdsZ0sSmK0aEXSomd_zs5iGq8vh4j0-QM36Fw97_sft7V5vRwQUpqBNXoeGgciZlmuPGrcNI2CB8mKXzqQOuAZmseK5KG9IipWTpo5eScBs4X5Vvr7MV_JNRm9Fw1q1j1-l2fkl51oNbs95ks_F_RNPPi4xW0PiZy9WxjP2Fvi6XP3Y04Mq8WL7sNHfJU18EFtlOgGWXd514I1wbcw02yRq8oBW15rX6qO9-vZ9PXggkBVLvDHPCtmt6a",null,null,492,26,null,null,0,"2"]',
}

export enum ErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  NO_RESULT = 'NO_RESULT',
}

export enum RpcIds {
  DEFAULT = 'MkEWBc',
  WORD = 'rPsWke',
}

export type RcpIdsKeys = keyof typeof RpcIds
